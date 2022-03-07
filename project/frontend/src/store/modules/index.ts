import user from '@/store/modules/user';
import toast from '@/store/modules/toast';
import dialog from '@/store/modules/dialog';
import loading from '@/store/modules/loading';
import sidebar from '@/store/modules/sidebar';

// store/modules配下で作成した各moduleをここで一挙にimport & exportする
export { user, toast, dialog, loading, sidebar };
