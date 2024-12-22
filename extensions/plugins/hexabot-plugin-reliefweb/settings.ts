import { PluginSetting } from '@/plugins/types';
import { SettingType } from '@/setting/schemas/types';

export default [
  {
    label: 'appname',
    group: 'default',
    type: SettingType.text,
    value: 'hexabot-reliefweb'
  },
  {
    label: 'endpoint',
    group: 'default',
    type: SettingType.text,
    value: 'reports'
  },
  {
    label: 'limit',
    group: 'default',
    type: SettingType.number,
    value: 10
  },
  {
    label: 'query_operator',
    group: 'default',
    type: SettingType.text,
    value: 'AND'
  },
  {
    label: 'fields',
    group: 'default',
    type: SettingType.multiple_text,
    value: ['title', 'body', 'country', 'disaster_type', 'language', 'date']
  },
  {
    label: 'sort',
    group: 'default',
    type: SettingType.text,
    value: 'date:desc'
  }
] as const satisfies PluginSetting[];
