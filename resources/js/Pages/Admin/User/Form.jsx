import InputText from "@/Components/InputText";

import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

export default function Form({ model, onClose, setModel }) {
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
            title: "Tambah User",
            text: `Apakah anda yakin ingin menambahkan ${data.first_name} sebagai user baru?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambahkan",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create.kelola_admin"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Membuat Akun",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 pengguna baru",
                            icon: "success",
                            timer: 1500,
                        });
                        reset();
                        onClose(false);
                        setModel(null);
                    },
                    preserveScroll: true,
                });
            } else {
                onClose(false);
            }
        });
    };

    const updateHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah User",
            text: `Apakah anda yakin ingin mengubah data ${data.first_name}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("update.kelola_admin"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal mengubah user",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil mengubah 1 user",
                            icon: "success",
                            timer: 1500,
                        });
                        reset();
                        onClose(false);
                        setModel(null);
                    },
                    preserveScroll: true,
                });
            } else {
                onClose(false);
            }
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            first_name: model ? model.first_name : "",
            last_name: model ? model.last_name : "",
            alamat: model ? model.alamat : "",
            no_telp: model ? model.no_telp : "",
            foto: model ? model.foto : "",
            email: model ? model.user?.email : "",
        });
    }, [model]);
    console.log(model);

    return (
        <div className="w-full h-screen flex justify-center items-center px-8">
            <div className="w-full ">
                <div className="w-full bg-white  px-4 rounded-md py-6">
                    <form
                        onSubmit={model ? updateHandler : submitHandler}
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
                        {model && (
                            <p className="font-bold ">
                                * Biarkan kosong jika tidak ingin merubah
                                password
                            </p>
                        )}
                        <InputText
                            className="w-full block"
                            required={model ? false : true}
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
                            required={model ? false : true}
                            title={"Konfirmasi Password"}
                            name={"password_confirmation"}
                            type="password_confirmation"
                            errors={errors.password_confirmation}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />

                        <div className="flex gap-3 items-center">
                            <button className="bg-blue-500 px-4 text-white py-2 font-bold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                                {model ? "Update User" : "Tambah User"}
                            </button>
                            <button
                                onClick={() => {
                                    onClose(false);
                                    setModel(null);
                                }}
                                type="button"
                                className="bg-red-500 px-4 text-white py-2 font-bold rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out"
                            >
                                Cancell
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
