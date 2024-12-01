<?php

namespace App\Providers;

use Illuminate\Auth\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\ServiceProvider;

class RedirectIfAuthenticatedServiceProvider extends ServiceProvider
{
    /**
     * Register service
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Change default login redirect.
     *
     * @return void
     */
    public function boot()
    {
        RedirectIfAuthenticated::redirectUsing(function ($request) {
            return route('profile.edit');
        });
    }
}
