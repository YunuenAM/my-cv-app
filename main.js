import "./style.css"
import Experience from "./Experience/Experience.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import swal from "sweetalert2";


const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
        const response = await fetch(e.target.action, {
            method: e.target.method,
            body: form,
            headers: {
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            e.target.reset();
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Thanks, I will contact you soon'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Something went wrong'
        });
    }
};

const experience = new Experience(document.querySelector(".experience-canvas"));

const form =  document.querySelector("#form")

form.addEventListener("submit", handleSubmit);

window.addEventListener('load', () => {
  const preloader = document.getElementById('loading');
  preloader.style.display = 'none';




});


