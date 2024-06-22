import InputText from "@/Components/InputText";
import SweetAlert from "@/Components/SweetAlert";
import Guest from "@/Layouts/GuestLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export default function Register() {
    const register = useRef(null);
    const { studio } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        first_name: "",
        last_name: "",
        alamat: "",
        no_telp: "",
        foto: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Register Akun",
            text: "Apakah data yang anda masukkan sudah benar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Register",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("register"), {
                    onError: (error) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Membuat Akun",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    useEffect(() => {
        setTimeout(() => {
            register.current.scrollIntoView({ behavior: "smooth" });
        }, 1000);
    });
    return (
        <div ref={register} className="px-8 md:px-16 lg:px-24 ">
            <div className="w-full bg-white py-6 px-4 rounded-md">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Register Account
                </h3>
                <p className="text-orange-500 text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
                <form
                    onSubmit={submitHandler}
                    action=""
                    className="flex flex-col gap-3 w-full"
                >
                    <InputText
                        required
                        className="w-full"
                        title={"Nama Depan"}
                        name={"first_name"}
                        errors={errors.first_name}
                        value={data.first_name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full"
                        title={"Nama belakang"}
                        name={"last_name"}
                        errors={errors.last_name}
                        value={data.last_name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <InputText
                            className="w-full block"
                            title={"Alamat"}
                            name={"alamat"}
                            required
                            errors={errors.alamat}
                            value={data.alamat}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className="w-full block"
                            title={"Telph"}
                            required
                            name={"no_telp"}
                            errors={errors.no_telp}
                            value={data.no_telp}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            className="w-full block"
                            title={"Foto"}
                            type="file"
                            name={"foto"}
                            errors={errors.foto}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.files[0],
                                })
                            }
                        />
                    </div>
                    <InputText
                        className="w-full block"
                        required
                        title={"Email"}
                        name={"email"}
                        type="email"
                        errors={errors.email}
                        value={data.email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full block"
                        required
                        title={"Password"}
                        name={"password"}
                        type="password"
                        errors={errors.password}
                        value={data.password}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="w-full block"
                        required
                        title={"Konfirmasi Password"}
                        name={"password_confirmation"}
                        type="password"
                        errors={errors.password_confirmation}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <div className="flex gap-3 items-center">
                        <button className="bg-orange-400 px-4 text-white py-2 font-bold rounded-md">
                            Register
                        </button>
                        <Link
                            href={route("login")}
                            className="text-orange-500 hover:text-orange-700 italic"
                        >
                            Login jika sudah punya akun?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
Register.layout = (page) => <Guest children={page} title={"Register"} />;
