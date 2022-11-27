import { Vue, Component } from 'vue-property-decorator';
declare module 'vue/types/vue' {
    interface Vue {
        resetForm(name: string): void;
    }
}

/**
 *  表单清空mixins
 */
@Component
export default class FormValidateMixin extends Vue {
    public resetForm(formName: string) {
        (this.$refs[formName] as any).resetFields();
    }
}
