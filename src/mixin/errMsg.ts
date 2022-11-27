import { Vue, Component } from 'vue-property-decorator';
declare module 'vue/types/vue' {
    interface Vue {
        catchErrMsg(err: any): void;
    }
}

/**
 *  表单清空mixins
 */
@Component
export default class ErrorMessageMixin extends Vue {
    $message: any;
    public catchErrMsg(err: Error) {
        this.$message.error(err.message);
    }
}
