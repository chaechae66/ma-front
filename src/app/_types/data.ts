export interface TOverAll {
  date: string;
  world_name: string;
  ranking: number;
  character_name: string;
  character_level: number;
  character_exp: number;
  class_name: string;
  sub_class_name: string;
  character_popularity: number;
  character_guildname: string;
}

export interface TDojang {
  date: string;
  ranking: number;
  dojang_floor: number;
  dojang_time_record: number;
  character_name: string;
  world_name: string;
  class_name: string;
  sub_class_name: string;
  character_level: number;
}

export interface TNotice {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

export interface TStat {
  stat_name: string;
  stat_value: string;
}

interface THyperItem {
  stat_type: string;
  stat_point: number | null;
  stat_level: number | null;
  stat_increase: number | null;
}

export interface THyperData {
  date: null;
  character_class: string;
  use_preset_no: string;
  use_available_hyper_stat: number;
  [key: `hyper_stat_preset_${number}_remain_point`]: number;
  [key: `hyper_stat_preset_${number}`]: THyperItem[];
}

export interface TDetailSkill {
  skill_name: string;
  skill_description: string;
  skill_level: number;
  skill_icon: string;
  skill_effect_next: String | null;
}

export interface TLinkedSkill {
  data: null;
  character_class?: string;
  character_link_skill?: TDetailSkill[];
  [key: `character_link_skill_preset_${number}`]: Omit<
    TDetailSkill,
    "skill_effect_next"
  >[];
  character_owned_link_skill?: Omit<TDetailSkill, "skill_effect_next">;
  character_owned_link_skill_preset_1?: Omit<TDetailSkill, "skill_effect_next">;
  character_owned_link_skill_preset_2?: Omit<TDetailSkill, "skill_effect_next">;
  character_owned_link_skill_preset_3?: Omit<TDetailSkill, "skill_effect_next">;
}

export interface TDefatulSkill {
  date: null;
  character_class: string;
  character_skill_grade: string;
  character_skill: (TDetailSkill & {
    skill_effect: string | null;
  })[];
}
