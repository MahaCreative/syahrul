import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Swall = withReactContent(Swal);
export default function SweetAlert({ title, text, confirmButton, onConfirm }) {
    Swall.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: { confirmButton },
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        }
    });
}
