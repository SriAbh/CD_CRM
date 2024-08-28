<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Alert extends Component
{

    public $alertmsg;
    /**
     * Create a new component instance.
     */
    public function __construct( $alertmsg )
    {
        $this->alertmsg = $alertmsg;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.alert');
    }
}
