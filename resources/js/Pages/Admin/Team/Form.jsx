import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

export default function Form({ onClose, model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        posisi: "",
        foto: "",
        deskripsi: "",
        facebook_studio: "",
        instagram_studio: "",
        link_facebook_studio: "",
        link_instagram_studio: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Tambah Team",
            text: `Apakah anda yakin ingin menambahkan ${data.nama} sebagai team baru?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambahkan",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create.kelola_team"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Membuat Team",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 team baru",
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
            title: "Edit Team",
            text: `Apakah anda yakin ingin mengubah data ${data.nama}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("update.kelola_team"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal mengubah data team",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil mengubah data team",
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
            nama: model ? model.nama : "",
            posisi: model ? model.posisi : "",
            foto: model ? model.foto : "",
            deskripsi: model ? model.deskripsi : "",
            facebook_studio: model ? model.facebook_studio : "",
            instagram_studio: model ? model.instagram_studio : "",
            link_facebook_studio: model ? model.link_facebook_studio : "",
            link_instagram_studio: model ? model.link_instagram_studio : "",
        });
    }, [model]);

    return (
        <div
            className="px-8 md:px-16 lg:px-24 w-full h-full flex overflow-y-auto justify-center items-center
        "
        >
            <div className="w-full bg-white py-6 px-4 rounded-md  max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                    {model ? `Edit Team ${data.nama}` : "Tambah Team"}
                </h3>
                <p className="font-light text-xs italic">
                    Silahkan mengisi form isian dibawah ini dengan benar.
                </p>
                <form
                    onSubmit={model ? updateHandler : submitHandler}
                    className="flex flex-col gap-3 w-full py-3"
                >
                    <InputText
                        required
                        className="w-full"
                        title={"Nama Lengkap"}
                        name={"nama"}
                        errors={errors.nama}
                        value={data.nama}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        required
                        className="w-full"
                        title={"Posisi"}
                        name={"posisi"}
                        errors={errors.posisi}
                        value={data.posisi}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        // required
                        className="w-full"
                        title={"Foto"}
                        name={"foto"}
                        errors={errors.foto}
                        type="file"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.files[0],
                            })
                        }
                    />
                    <InputText
                        // required
                        className="w-full"
                        title={"Deskripsi"}
                        name={"deskripsi"}
                        errors={errors.deskripsi}
                        value={data.deskripsi}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                        Sosial media Team
                    </h3>
                    <p className="font-light text-xs italic">
                        Silahkan mengisikan sosial media Team. isikan dengan
                        nama dan URL/Link Id dari Team Anda
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center my-3 w-full">
                        <InputText
                            // required
                            className="w-full"
                            title={"Facebook"}
                            name={"facebook_studio"}
                            errors={errors.facebook_studio}
                            value={data.facebook_studio}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            // required
                            className="w-full "
                            title={"URL Facebook"}
                            name={"link_facebook_studio"}
                            errors={errors.link_facebook_studio}
                            value={data.link_facebook_studio}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center my-3 w-full">
                        <InputText
                            // required
                            className="w-full"
                            title={"Instagram"}
                            name={"instagram_studio"}
                            errors={errors.instagram_studio}
                            value={data.instagram_studio}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            // required
                            className="w-full "
                            title={"URL Instagram"}
                            name={"link_instagram_studio"}
                            errors={errors.link_instagram_studio}
                            value={data.link_instagram_studio}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <button className="bg-blue-500 px-4 text-white py-2 font-bold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                            {model ? "Update Team" : "Tambah Team"}
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
    );
}
