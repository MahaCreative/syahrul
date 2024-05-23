<?php

namespace App\Models;

use App\Enums\InvoiceStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentInvoice extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $cats = [
        'cart_ids' => 'array',
        'payment_info' => 'array',
        'succeeded_at' => 'datetime',
        'status' => InvoiceStatus::class,
    ];
    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class, 'cart_ids');
    }
}
