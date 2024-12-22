import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import {
  OutgoingMessageFormat,
  StdOutgoingEnvelope,
  StdOutgoingTextEnvelope,
} from '@/chat/schemas/types/message';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import { SettingService } from '@/setting/services/setting.service';
import SETTINGS from './settings';

@Injectable()
export class ReliefwebPlugin extends BaseBlockPlugin<typeof SETTINGS> {
  template: PluginBlockTemplate = {
    patterns: ['relief', 'humanitarian', 'disaster'],
    starts_conversation: true,
    name: 'ReliefWeb Plugin',
  };

  private baseUrl = 'https://api.reliefweb.int/v1';

  constructor(
    pluginService: PluginService,
    private readonly settingService: SettingService,
  ) {
    super('reliefweb-plugin', pluginService);
  }

  getPath(): string {
    return __dirname;
  }

  private async makeApiRequest(endpoint: string, params: any) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        params: {
          appname: params.appname,
          query: {
            value: params.query,
            operator: params.query_operator,
          },
          limit: params.limit,
          offset: 0,
          sort: [params.sort],
          fields: {
            include: params.fields,
          },
        },
      });
      return response.data;
    } catch (error) {
      console.error('ReliefWeb API Error:', error);
      throw error;
    }
  }

  private formatResponse(data: any): string {
    if (!data || !data.data || data.data.length === 0) {
      return 'No results found.';
    }

    return data.data.map((item: any) => {
      const fields = item.fields;
      return `
Title: ${fields.title}
Date: ${fields.date?.created || 'N/A'}
Country: ${fields.country?.map((c: any) => c.name).join(', ') || 'N/A'}
${fields.body ? '\nSummary: ' + fields.body.substring(0, 200) + '...' : ''}
${fields.url ? '\nRead more: ' + fields.url : ''}
-------------------`;
    }).join('\n');
  }

  async process(
    block: Block,
    context: Context,
    _convId: string,
  ): Promise<StdOutgoingEnvelope> {
    const args = this.getArguments(block);
    
    try {
      const apiResponse = await this.makeApiRequest(args.endpoint, {
        appname: args.appname,
        query: context.text,
        query_operator: args.query_operator,
        limit: args.limit,
        sort: args.sort,
        fields: args.fields,
      });

      const formattedResponse = this.formatResponse(apiResponse);

      const envelope: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: formattedResponse,
        },
      };

      return envelope;
    } catch (error) {
      const errorEnvelope: StdOutgoingTextEnvelope = {
        format: OutgoingMessageFormat.text,
        message: {
          text: 'Sorry, I encountered an error while fetching information from ReliefWeb. Please try again later.',
        },
      };
      return errorEnvelope;
    }
  }
}
