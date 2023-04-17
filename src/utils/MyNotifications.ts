import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

class MyNotifications {
	static error(text: string) {
		Swal.fire({
			title: 'Error!',
			text: text,
			icon: 'error',
			timer: 3000,
		});
	}
}

export default MyNotifications;
