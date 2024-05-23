<?php

namespace App\Enums;

enum InvoiceStatus: string
{
    case PENDING = 'pending';
    case LUNAS = 'lunas';
    case BELUM = 'belum lunas';
}
