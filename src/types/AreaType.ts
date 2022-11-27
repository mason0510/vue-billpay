export interface AreaType {
    areaId?: string;
    areaName: string;
    areaAddress?: string;
    areaDescribe?: string; // 场地介绍
    areaCost: string; // 场地费用(元)
    areaImages?: string; // 可以没有
    areaStartTime: Date | number; // 场地的开放
    areaEndTime: Date | number;  // 结束时间
}
