<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_ledger_heads', function (Blueprint $table) {
            $table->id();
            $table->string('ledger_head_id')->constrained('ledger_heads')->onDelete('cascade');
            $table->string('sub_ledger_head_name');
            $table->string('sub_ledger_head_code');
            $table->text('remark')->nullable();
            $table->boolean('is_active')->default(true);
              $table->softDeletes();
            $table->timestamps();
          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_ledger_heads');
    }
};
