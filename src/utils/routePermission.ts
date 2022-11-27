import { RouteConfig } from 'vue-router';

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有的路由表
 * @param roles 当前角色
 * @param power 当前角色的权限等级
 */
export function filterAsyncRouter(asyncRouterMap: RouteConfig[] = [], roles: string, power: string): any[] {
    const assessedRouters = asyncRouterMap.filter((route) => {
        if (hasPermission(roles, power, route)) {
            // if (route.children && route.children.length > 0) {
            //     route.children = filterAsyncRouter(route.children, power, roles);
            // }
            return true; // 直接返回回去
        }
        return false;
    });
    return assessedRouters;
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param roles 当前角色
 * @param power 当前角色的权限等级
 * @param route 当前路由对象
 */
export function hasPermission(roles: string, power: string, route: RouteConfig): boolean {
    // tslint:disable-next-line: triple-equals
    if (power == '1') { // power等于1就是最高权限
        return true;
    } else {
        if (roles.includes(route.path.split(/\//)[1])) {
            return true;
        }
        return false;
    }
}
