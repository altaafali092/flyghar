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
        Schema::create('office_settings', function (Blueprint $table) {
            $table->id();
            $table->string('office_name');
            $table->string('office_address');
            $table->string('office_image')->nullable();
            $table->string('office_cover')->nullable();
            $table->string('office_phone')->nullable();
            $table->string('office_gmail')->nullable();
            $table->string('fb_url')->nullable();
            $table->string('insta_url')->nullable();
            $table->string('youtube_url')->nullable();
        
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_settings');
    }
};
