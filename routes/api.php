<?php

use App\Http\Controllers\Pelanggan\PaymentPesananController;
use App\Models\DetailPesanan;
use App\Models\PaymentInvoice;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('midtrans-callback', [PaymentPesananController::class, 'payment_notif'])->name('payment-notification');
Route::get('get-token', [PaymentPesananController::class, 'get_token'])->name('get-token');
