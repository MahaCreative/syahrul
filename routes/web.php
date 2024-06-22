<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GaleryController;
use App\Http\Controllers\Admin\JadwalController;
use App\Http\Controllers\Admin\KelolaAdminController;
use App\Http\Controllers\Admin\KonfirmasiPesananPaket;
use App\Http\Controllers\Admin\PaketBookingController;
use App\Http\Controllers\Admin\PelangganController;
use App\Http\Controllers\Admin\PesananPelanggan;
use App\Http\Controllers\Admin\ProfileSaya;
use App\Http\Controllers\Admin\ProfileStudio;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\Pelanggan\DaftarPaketController;
use App\Http\Controllers\Pelanggan\GaleryController as PelangganGaleryController;
use App\Http\Controllers\Pelanggan\HomeController;
use App\Http\Controllers\Pelanggan\PaymentPesananController;
use App\Http\Controllers\Pelanggan\PesananController;
use App\Http\Controllers\Pelanggan\ProfileSayaController;
use App\Http\Controllers\PembayaranPelanggan;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UlasanStudio;
use App\Models\Galery;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', [HomeController::class, 'index'])->name('home');
Route::post('ulasan', [UlasanStudio::class, 'store'])->name('store-ulasan-studio');
Route::get('daftar-paket', [DaftarPaketController::class, 'index'])->name('daftar-paket');
Route::get('galery', [PelangganGaleryController::class, 'index'])->name('galery');


Route::middleware(['guest'])->group(function () {
    Route::get('register', [AuthController::class, 'register'])->name('register');
    Route::post('register', [AuthController::class, 'store_register']);
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'store_login']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('profile-studio', [ProfileStudio::class, 'index'])->name('admin.profile_studio');
    Route::post('update-profile-studio', [ProfileStudio::class, 'update'])->name('admin.update-profile_studio');
    Route::get('admin/profil-saya', [ProfileSaya::class, 'index'])->name('admin.profile-admin');
    Route::post('update-profil-saya', [ProfileSaya::class, 'update'])->name('admin.update-profile-saya');


    Route::get('kelola-admin', [KelolaAdminController::class, 'index'])->name('admin.kelola_admin');
    Route::post('create-admin', [KelolaAdminController::class, 'create'])->name('create.kelola_admin');
    Route::post('update-admin', [KelolaAdminController::class, 'update'])->name('update.kelola_admin');
    Route::delete('delete-admin', [KelolaAdminController::class, 'delete'])->name('delete.kelola_admin');

    Route::get('kelola-team', [TeamController::class, 'index'])->name('admin.kelola_team');
    Route::post('create-team', [TeamController::class, 'create'])->name('create.kelola_team');
    Route::post('update-team', [TeamController::class, 'update'])->name('update.kelola_team');
    Route::delete('delete-team', [TeamController::class, 'delete'])->name('delete.kelola_team');


    Route::get('kelola-galery', [GaleryController::class, 'index'])->name('admin.kelola_galery');
    Route::post('create-galery', [GaleryController::class, 'create'])->name('create.kelola_galery');
    Route::post('update-galery', [GaleryController::class, 'update'])->name('update.kelola_galery');
    Route::delete('delete-galery', [GaleryController::class, 'delete'])->name('delete.kelola_galery');

    Route::get('kelola-slider', [SliderController::class, 'index'])->name('admin.kelola_slider');
    Route::post('create-slider', [SliderController::class, 'create'])->name('create.kelola_slider');
    Route::post('update-slider', [SliderController::class, 'update'])->name('update.kelola_slider');
    Route::delete('delete-slider', [SliderController::class, 'delete'])->name('delete.kelola_slider');

    Route::get('kelola-jadwal', [JadwalController::class, 'index'])->name('admin.kelola-jadwal');
    Route::get('create-jadwal', [JadwalController::class, 'create'])->name('admin.create-kelola-jadwal');
    Route::post('store-jadwal', [JadwalController::class, 'store'])->name('admin.store-jadwal');
    Route::delete('delete-jadwal', [JadwalController::class, 'delete'])->name('delete.kelola-jadwal');

    Route::get('kelola-kategori', [KategoriController::class, 'index'])->name('admin.kelola-kategori');
    Route::post('store-kategori', [KategoriController::class, 'store'])->name('admin.store-kelola-kategori');
    Route::delete('delete-kategori', [KategoriController::class, 'delete'])->name('delete.kelola-kategori');

    Route::get('kelola-paket-booking', [PaketBookingController::class, 'index'])->name('admin.kelola_paket_booking');
    Route::get('show-kelola-paket-booking/{id}', [PaketBookingController::class, 'show'])->name('admin.show_paket');
    Route::post('create-paket-booking', [PaketBookingController::class, 'create'])->name('create.kelola_paket_booking');
    Route::post('update-paket-booking', [PaketBookingController::class, 'update'])->name('update.kelola_paket_booking');
    Route::delete('delete-paket-booking', [PaketBookingController::class, 'delete'])->name('delete.kelola_paket_booking');

    Route::get('list-pesanan-paket-pelanggan', [KonfirmasiPesananPaket::class, 'index'])->name('admin.list-pesanan-paket-pelanggan');
    Route::post('konfirmasi-pesanan-paket-booking', [KonfirmasiPesananPaket::class, 'create'])->name('create.konfirmasi-pesanan-paket-booking');

    Route::get('kelola-pelanggan', [PelangganController::class, 'index'])->name('admin.kelola-pelanggan');
    Route::get('pesanan-pelanggan', [PesananPelanggan::class, 'index'])->name('admin.pesanan-pelanggan');
    Route::get('pesanan-pelanggan/pelanggan/{id}', [PesananPelanggan::class, 'show_user'])->name('admin.show-pesanan-pelanggan');
    Route::get('pesanan-pelanggan/detail_pesanan/{kd_pesanan}', [PesananPelanggan::class, 'detail_pesanan'])->name('admin.detail-pesanan-pelanggan');

    Route::get('pembayaran-pelanggan', [PembayaranPelanggan::class, 'index'])->name('admin.pembayaran-pelanggan');
});

Route::get("logout", [AuthController::class, 'logout'])->name('logout');
// Route Pelanggan
Route::middleware(['auth'])->group(function () {
    Route::get('pesanan-saya', [PesananController::class, 'index'])->name('pesanan_saya');
    Route::get('pesanan-saya/{kd_pesanan}', [PesananController::class, 'show'])->name('show_pesanan_saya');
    Route::post('add-booking', [PesananController::class, 'add_cart'])->name('add_cart');
    route::post('remove-cart', [PesananController::class, 'remove_cart'])->name('remove_cart');
    route::post('edit-cart', [PesananController::class, 'edit_cart'])->name('edit_cart');
    route::post('batalkan-pesanan', [PesananController::class, 'cancell_pesanan'])->name('cancell_pesanan');
    Route::get('invoice-pesanan/{kd_pesanan}', [PesananController::class, 'invoice_pesanan'])->name('invoice_pesanan');
    Route::post('chekout-pesanan', [PaymentPesananController::class, 'checkout'])->name('checkout');
    Route::get('profil-saya', [ProfileSayaController::class, 'index'])->name('profil_saya');
    Route::post('profil-saya', [ProfileSayaController::class, 'update'])->name('update_profil_saya');
});
