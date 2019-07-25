import { toast } from "react-toastify";

export const errorsMessage = (err) => {
    if (err) {
        let message = 'Algo deu errado no servidor, informe o erro: ' + err + ' ao administrador';
        if (err.status === 400) {
            message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos.\n' + err.error.hint;
        }
        if (err.status === 401) {
            message = 'Você não tem permissão para ver isso, informe um usuário e senha válidos';
        }
        if (err.status === 422) {
            message = 'Falha de validação, verifique os campos';
        }
        if (err.status === 404 || err.status === 500) {
            message = 'Impossível se conectar ao servidor, verifique sua conexão ou tente novamente em alguns minutos';
        }
        toast.info(message);
        return err;
    }
}