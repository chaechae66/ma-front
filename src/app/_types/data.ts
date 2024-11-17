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

interface PetItemOption {
  option_type: string;
  option_value: string;
}

export interface PetEquipment {
  item_name: string;
  item_icon: string;
  item_description: string;
  item_option: PetItemOption[];
  scroll_upgrade: number;
  scroll_upgradable: number;
  item_shape: string;
  item_shape_icon: string;
}

export interface TPet {
  date: string;
  pet_1_name: string;
  pet_1_nickname: string;
  pet_1_icon: string;
  pet_1_description: string;
  pet_1_equipment: PetEquipment;
  pet_1_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  };
  pet_1_pet_type: string;
  pet_1_skill: string[];
  pet_1_date_expire: string;
  pet_1_appearance: string;
  pet_1_appearance_icon: string;
  pet_2_name: string;
  pet_2_nickname: string;
  pet_2_icon: string;
  pet_2_description: string;
  pet_2_equipment: PetEquipment;
  pet_2_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  };
  pet_2_pet_type: string;
  pet_2_skill: string[];
  pet_2_date_expire: string;
  pet_2_appearance: string;
  pet_2_appearance_icon: string;
  pet_3_name: string;
  pet_3_nickname: string;
  pet_3_icon: string;
  pet_3_description: string;
  pet_3_equipment: PetEquipment;
  pet_3_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  };
  pet_3_pet_type: string;
  pet_3_skill: string[];
  pet_3_date_expire: string;
  pet_3_appearance: string;
  pet_3_appearance_icon: string;
}

export interface TAD {
  date: null;
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_hair: {
    hair_name: string;
    base_color: string;
    mix_color: string;
    mix_rate: string;
  };
  android_face: {
    face_name: string;
    base_color: string;
    mix_color: string;
    mix_rate: string;
  };
  android_skin: {
    skin_name: string;
    color_style: string;
    hue: number;
    saturation: number;
    brightness: number;
  };
  android_cash_item_equipment: {
    cash_item_equipment_part: string;
    cash_item_equipment_slot: string;
    cash_item_name: string;
    cash_item_icon: string;
    cash_item_description: string;
    cash_item_option: {
      option_type: string;
      option_value: string;
    }[];
    date_expire: string;
    date_option_expire: string;
    cash_item_label: string;
    cash_item_coloring_prism: {
      color_range: string;
      hue: number;
      saturation: number;
      value: number;
    };
    android_item_gender: string;
  }[];
  android_ear_sensor_clip_flag: string;
  android_gender: string;
  android_grade: string;
  android_non_humanoid_flag: string;
  android_shop_usable_flag: string;
  preset_no: number;
  android_preset_1: {
    android_name: string;
    android_nickname: string;
    android_icon: string;
    android_description: string;
    android_gender: string;
    android_grade: string;
    android_skin: {
      skin_name: string;
      color_style: string;
      hue: number;
      saturation: number;
      brightness: number;
    };
    android_hair: {
      hair_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_face: {
      face_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_ear_sensor_clip_flag: string;
    android_non_humanoid_flag: string;
    android_shop_usable_flag: string;
  };
  android_preset_2: {
    android_name: string;
    android_nickname: string;
    android_icon: string;
    android_description: string;
    android_gender: string;
    android_grade: string;
    android_skin: {
      skin_name: string;
      color_style: string;
      hue: number;
      saturation: number;
      brightness: number;
    };
    android_hair: {
      hair_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_face: {
      face_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_ear_sensor_clip_flag: string;
    android_non_humanoid_flag: string;
    android_shop_usable_flag: string;
  };
  android_preset_3: {
    android_name: string;
    android_nickname: string;
    android_icon: string;
    android_description: string;
    android_gender: string;
    android_grade: string;
    android_skin: {
      skin_name: string;
      color_style: string;
      hue: number;
      saturation: number;
      brightness: number;
    };
    android_hair: {
      hair_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_face: {
      face_name: string;
      base_color: string;
      mix_color: string;
      mix_rate: string;
    };
    android_ear_sensor_clip_flag: string;
    android_non_humanoid_flag: string;
    android_shop_usable_flag: string;
  };
}

export interface TUnionDefault {
  date: null;
  union_level: number;
  union_grade: string;
  union_artifact_level: number;
  union_artifact_exp: number;
  union_artifact_point: number;
}

export interface TUnionRaider {
  date: null;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: {
    stat_field_id: string;
    stat_field_effect: string;
  }[];
  union_block: {
    block_type: string;
    block_class: string;
    block_level: string;
    block_control_point: {
      x: number;
      y: number;
    };
    block_position: {
      x: number;
      y: number;
    }[];
  }[];
  use_preset_no: number;
  [key: `union_raider_preset_${number}`]: {
    union_raider_stat: string[];
    union_occupied_stat: string[];
    union_inner_stat: {
      stat_field_id: string;
      stat_field_effect: string;
    }[];
    union_block: {
      block_type: string;
      block_class: string;
      block_level: string;
      block_control_point: {
        x: number;
        y: number;
      };
      block_position: {
        x: number;
        y: number;
      }[];
    }[];
  };
}

export interface TArtifact {
  date: null;
  union_artifact_effect: {
    name: string;
    level: number;
  }[];
  union_artifact_crystal: {
    name: string;
    validity_flag: string;
    date_expire: string;
    level: number;
    crystal_option_name_1: string;
    crystal_option_name_2: string;
    crystal_option_name_3: string;
  }[];
  union_artifact_remain_ap: number;
}

export interface TCharcterElem {
  character_class: string;
  character_level: number;
  character_name: string;
  ocid: string;
  world_name: string;
}

export interface TCharcterList {
  account_id: string;
  character_list: TCharcterElem[];
}

export interface TStarforce {
  after_starforce_count: number;
  before_starforce_count: number;
  bonus_stat_upgrade: string;
  chance_time: string;
  character_name: string;
  date_create: string;
  destroy_defence: string;
  event_field_flag: string;
  id: string;
  item_upgrade_result: string;
  protect_shield: string;
  starcatch_result: string;
  starforce_event_list:
    | null
    | {
        success_rate: string;
        cost_discount_rate: string;
        plus_value: string;
        starforce_event_range: string;
      }[];
  superior_item_flag: string;
  target_item: string;
  upgrade_item: string;
  world_name: string;
}
