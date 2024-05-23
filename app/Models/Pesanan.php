<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function detailPesanan()
    {
        return $this->hasMany(DetailPesanan::class);
    }
    public function invoice()
    {
        return $this->hasOne(PaymentInvoice::class, 'cart_ids', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
