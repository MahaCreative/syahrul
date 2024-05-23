import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

export default function Form({ onClose, model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        nama_pelanggan: "",
        foto: "",
        tanggal_foto: "",
        deskripsi: "",
        taken_by: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Tambah Galery",
            text: `Apakah anda yakin ingin menambahkan ${data.nama_pelanggan} sebagai galery baru?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambahkan",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create.kelola_galery"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Membuat Galery",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 galery baru",
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
            title: "Edit Galery",
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
                post(route("update.kelola_galery"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal mengubah data galery",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil mengubah data galery",
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
            nama_pelanggan: model ? model.nama_pelanggan : "",
            foto: model ? model.foto : "",
            tanggal_foto: model ? model.tanggal_foto : "",
            deskripsi: model ? model.deskripsi : "",
            taken_by: model ? model.taken_by : "",
        });
    }, [model]);

    return (
        <div
            className="px-8 md:px-16 lg:px-24 w-full h-full flex overflow-y-auto justify-center items-center
        "
        >
            <div className="w-full bg-white py-6 px-4 rounded-md  max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                    {model ? `Edit Galery ${data.nama}` : "Tambah Galery"}
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
                        title={"Nama Pelanggan"}
                        name={"nama_pelanggan"}
                        errors={errors.nama_pelanggan}
                        value={data.nama_pelanggan}
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
                        title={"Tanggal Foto"}
                        name={"tanggal_foto"}
                        errors={errors.tanggal_foto}
                        value={data.tanggal_foto}
                        type="date"
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
                        title={"Taken By"}
                        name={"taken_by"}
                        errors={errors.taken_by}
                        value={data.taken_by}
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

                    <div className="flex gap-3 items-center">
                        <button className="bg-blue-500 px-4 text-white py-2 font-bold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                            {model ? "Update Galery" : "Tambah Galery"}
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
