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

export interface TVmatrix {
  date: null;
  character_class: string;
  character_v_core_equipment: {
    slot_id: string;
    slot_level: number;
    v_core_name: string;
    v_core_level: number;
    v_core_skill_1: string;
    v_core_skill_2: string;
    v_core_skill_3: string;
    v_core_type: string;
  }[];
  character_v_matrix_remain_slot_upgrade_point: number;
}

export interface TEquipmentDetail {
  item_equipment_part: string;
  item_equipment_slot: string;
  item_name: string;
  item_icon: string;
  item_description: string | null;
  item_shape_name: string;
  item_shape_icon: string;
  item_gender: string | null;
  item_total_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    damage: string;
    equipment_level_decrease: number;
    max_hp_rate: string;
    max_mp_rate: string;
    [key: string]: string | number;
  };
  item_base_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    max_hp_rate: string;
    max_mp_rate: string;
    base_equipment_level: number;
    [key: string]: string | number;
  };
  potential_option_grade: string;
  additional_potential_option_grade: string;
  potential_option_flag: string | null;
  potential_option_1: string;
  potential_option_2: string;
  potential_option_3: string;
  additional_potential_option_flag: null | string;
  additional_potential_option_1: string;
  additional_potential_option_2: string;
  additional_potential_option_3: string;
  equipment_level_increase: number;
  item_exceptional_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    exceptional_upgrade: number;
    [key: string]: string | number;
  };
  item_add_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    damage: string;
    all_stat: string;
    equipment_level_decrease: number;
    [key: string]: string | number;
  };
  growth_exp: number;
  growth_level: number;
  scroll_upgrade: string;
  cuttable_count: string;
  golden_hammer_flag: string;
  scroll_resilience_count: string;
  scroll_upgradeable_count: string;
  soul_name: string | null;
  soul_option: string | null;
  item_etc_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    [key: string]: string | number;
  };
  starforce: string;
  starforce_scroll_flag: string;
  item_starforce_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    [key: string]: string | number;
  };
  special_ring_level: number;
  date_expire: null | string;
}

export interface TEquipment {
  date: null;
  character_gender: string;
  character_class: string;
  preset_no: number;
  item_equipment: TEquipmentDetail[];
  [key: `item_equipment_preset_${number}`]: TEquipmentDetail[];
  title: {
    title_name: string;
    title_icon: string;
    title_description: string;
    date_expire: null | string;
    date_option_expire: string;
  };
  dragon_equipment: TEquipmentDetail[];
  mechanic_equipment: TEquipmentDetail[];
}

interface CashItemOption {
  option_type: string;
  option_value: string;
}

interface CashItemColoringPrism {
  color_range: string;
  hue: number;
  saturation: number;
  value: number;
}

export interface CashItemEquipment {
  cash_item_equipment_part: string;
  cash_item_equipment_slot: string;
  cash_item_name: string;
  cash_item_icon: string;
  cash_item_description: string;
  cash_item_option: CashItemOption[];
  date_expire: string;
  date_option_expire: string;
  cash_item_label: string;
  cash_item_coloring_prism: CashItemColoringPrism;
  item_gender: string;
}

export interface TCash {
  date: string;
  character_gender: string;
  character_class: string;
  character_look_mode: string;
  preset_no: number;
  cash_item_equipment_base: CashItemEquipment[];
  cash_item_equipment_preset_1: CashItemEquipment[];
  cash_item_equipment_preset_2: CashItemEquipment[];
  cash_item_equipment_preset_3: CashItemEquipment[];
  additional_cash_item_equipment_base: CashItemEquipment[];
  additional_cash_item_equipment_preset_1: CashItemEquipment[];
  additional_cash_item_equipment_preset_2: CashItemEquipment[];
  additional_cash_item_equipment_preset_3: CashItemEquipment[];
  [key: `cash_item_equipment_preset_${number}`]: CashItemEquipment[];
}

export interface TDetailSymbol {
  symbol_name: string;
  symbol_icon: string;
  symbol_description: string;
  symbol_force: string;
  symbol_level: number;
  symbol_str: string;
  symbol_dex: string;
  symbol_int: string;
  symbol_luk: string;
  symbol_hp: string;
  symbol_drop_rate: string;
  symbol_meso_rate: string;
  symbol_exp_rate: string;
  symbol_growth_count: number;
  symbol_require_growth_count: number;
}

export interface TSymbolEquipment {
  date: string;
  character_class: string;
  symbol: TDetailSymbol[];
}
