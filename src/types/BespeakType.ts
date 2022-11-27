export interface BespeakType {
    bespeakId?: string;
    bespeakStartDate: Date | number;
    bespeakEndDate: Date | number;
    bespeakStatus?: string; // 预约状态1.预约中 2.预约成功 3.预约失败
    baspeakMsg?: string; // 预约成功/失败的信息等，可以发送邮件
    areaName?: string; // 预约的场地名(多表查询)
    areaAddress?: string; // 预约的场地地址
    username?: string;
    userId?: string;
    areaId?: string;
}
