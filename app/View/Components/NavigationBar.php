<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class NavigationBar extends Component
{
    public $navtitle;

    /**
     * Create a new component instance.
     */
    public function __construct($navtitle)
    {
        $this->navtitle = $navtitle;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.navigation-bar');
    }
}
