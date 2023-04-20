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

	static async confirmDelete() {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: `Yes, delete it!`,
		});

		return result.isConfirmed;
	}

	static successToDelete(successDeleteText: string = 'The item has been removed.') {
		Swal.fire('Deleted!', successDeleteText, 'success');
	}

	static success(successText: string = 'it has been successful!') {
		Swal.fire({
			position: 'top',
			icon: 'success',
			title: successText,
			showConfirmButton: false,
			timer: 1000,
		});
	}
}

export default MyNotifications;
