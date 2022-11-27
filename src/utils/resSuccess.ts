// 成功返回数据，失败抛出异常
export const ResSuccess = (res: any) => {
    if (res.flag) {
        return res;
    } else {
        throw new Error(res.message);
    }
};
