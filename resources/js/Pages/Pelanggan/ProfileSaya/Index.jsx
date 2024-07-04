import InputText from "@/Components/InputText";
import Guest from "@/Layouts/GuestLayout";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function Index(props) {
    const { studio } = usePage().props;
    const pelanggan = props.pelanggan;
    const { data, setData, post, reset, errors } = useForm({
        first_name: pelanggan.first_name,
        last_name: pelanggan.last_name,
        alamat: pelanggan.alamat,
        no_telp: pelanggan.no_telp,
        foto: pelanggan.foto,
        email: pelanggan.user.email,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Edit Profile",
            text: "Apakah anda yakin merubah profile anda?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Edit Profile",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("update_profil_saya"), {
                    onError: (error) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Mengedit Akun",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Success",
                            text: "Berhasil memperbaharui profile anda",
                            icon: "success",
                            timer: 1500,
                        });
                    },
                    preserveScroll: true,
                });
            }
        });
    };
    return (
        <div className="py-16 px-4 md:px-8 lg:px-16">
            <div className="my-6">
                <h3 className="text-orange-500 text-center text-4xl font-bold tracking-tighter">
                    Profile Saya
                </h3>
                <p className="text-white text-center mb-4  text-xl md:text-3xl font-light">
                    {studio.nama_studio + " " + studio.tagline}
                </p>
            </div>
            <div className="bg-white rounded-md py-6 px-4 flex justify-between items-start gap-3 flex-col md:flex-row">
                <img
                    src={"/storage/" + pelanggan.foto}
                    className="w-full lg:w-1/2 object-cover"
                />
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
                    <p>* Biarkan Kosong Jika Tidak Ingin merubah password</p>
                    <InputText
                        className="w-full block"
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
                            Edit Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <Guest children={page} title={"Profile Saya"} about={false} />
);
