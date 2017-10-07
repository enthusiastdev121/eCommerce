@extends('mage2-ecommerce::admin.layouts.app')

@section('content')
    <div class="container">
        <h1>
            <span class="main-title-wrap">Pages List</span>
            <a style="" href="{{ route('admin.page.create') }}" class="btn btn-primary float-right">Create
                Page</a>
        </h1>
        {!! $dataGrid->render() !!}
    </div>

@stop