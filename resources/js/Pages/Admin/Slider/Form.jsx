import InputText from "@/Components/InputText";
import { useForm } from "@inertiajs/react";
import { MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import Swal from "sweetalert2";

export default function Form({ onClose, model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        title: "",
        subtitle: "",
        foto: "",
        position: "",
        status: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Tambah slider",
            text: `Apakah anda yakin ingin menambahkan ${data.title} sebagai slider baru?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambahkan",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("create.kelola_slider"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal Membuat slider",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 slider baru",
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
            title: "Edit slider",
            text: `Apakah anda yakin ingin mengubah data ${data.title}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Update",
            allowOutsideClick: false,
            zIndex: 9999,
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("update.kelola_slider"), {
                    onError: (err) => {
                        Swal.fire({
                            position: "center",
                            title: "Gagal mengubah data slider",
                            text: "Periksa form isian anda, mungkin terdapat kesalahan pada isian anda?",
                            icon: "error",
                            timer: 1500,
                        });
                    },
                    onSuccess: () => {
                        Swal.fire({
                            position: "center",
                            title: "Sukses",
                            text: "Berhasil mengubah data slider",
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
            title: model ? model.title : "",
            subtitle: model ? model.subtitle : "",
            foto: model ? model.foto : "",
            position: model ? model.position : "",
            status: model ? model.status : "",
        });
    }, [model]);

    return (
        <div
            className="px-8 md:px-16 lg:px-24 w-full h-full flex overflow-y-auto justify-center items-center
        "
        >
            <div className="w-full bg-white py-6 px-4 rounded-md  max-h-[90vh] overflow-y-auto">
                <h3 className="font-bold text-orange-500 text-base md:text-lg lg:text-xl ">
                    {model ? `Edit slider ${data.title}` : "Tambah slider"}
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
                        title={"Title"}
                        name={"title"}
                        errors={errors.title}
                        value={data.title}
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
                        title={"Subtitle"}
                        name={"subtitle"}
                        errors={errors.subtitle}
                        value={data.subtitle}
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
                        title={"foto"}
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
                    <div>
                        <p>Posisi Slider</p>
                        <Select
                            error={errors.position ? true : false}
                            className="w-full"
                            name="position"
                            value={data.position}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="" selected>
                                {model
                                    ? model.posisi
                                    : "Pilih Posisi Teks Slider"}
                            </MenuItem>
                            <MenuItem value={"left"}>Left</MenuItem>
                            <MenuItem value={"center"}>Center</MenuItem>
                            <MenuItem value={"right"}>Right</MenuItem>
                        </Select>
                        {errors && (
                            <p className="text-xs text-red-500 italic">
                                {errors.position}
                            </p>
                        )}
                    </div>
                    <div>
                        <Select
                            name="status"
                            error={errors.status ? true : false}
                            value={data.status}
                            className="w-full"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="">
                                {model
                                    ? model.status == "ya"
                                        ? "Slider AKtif"
                                        : "Slider Non Aktif"
                                    : "Pilih Status Aktif Slider"}
                            </MenuItem>
                            <MenuItem value={"ya"}>Slider Aktif</MenuItem>
                            <MenuItem value={"tidak"}>
                                Slider Non Aktif
                            </MenuItem>
                        </Select>
                        {errors && (
                            <p className="text-xs text-red-500 italic">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 items-center">
                        <button className="bg-blue-500 px-4 text-white py-2 font-bold rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out">
                            {model ? "Update Slider" : "Tambah Slider"}
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
