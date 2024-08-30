@extends('layout.layout')
@section('title', 'Dynamic Form Page')
@section('content')


<!-- Navbar Section -->
<nav class="navbar bg-white top-0 position-sticky"  style="z-index: 100;">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <!-- Page Title -->
                <a class="navbar-brand text-black fw-bold fs-4">Create Account</a>
                <!-- Edit Page Layout Link -->
                <a href="{{route('sections.editSection')}}" class="ms-3 text-decoration-underline">Edit Page Layout</a>
            </div>
            <!-- Action Buttons -->
            <form class="d-flex gap-2 my-3" action="javascript:void(0)">
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Cancel</button>
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Save and New</button>
                <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Save</button>
            </form>
        </div>
    </nav>


<div class="container">
    <h2>Generated Form</h2>
    <!-- Container where the dynamic form will be created -->
    <div id="dynamicFormContainer">
        <form class="generated-parent-form row" id="generated-parent-form"
        style="border: 2px dashed #ccc;">
        </form>
    </div>
</div>
@endsection