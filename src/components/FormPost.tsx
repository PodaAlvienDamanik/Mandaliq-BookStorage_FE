import { Textarea } from '@headlessui/react';
import { UseMutateFunction } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

interface FormPostFields {
title: string;
body: string;
tags: string;
reactions: reactionType;
views: number;
userId: number;
}

interface DataPost {
title: string;
body: string;
tags: string[];
reactions: reactionType;
views: number;
userId: number;
}

interface reactionType {
likes: number,
dislikes: number
}

interface PostFormElementProps {
isEdit: boolean;
mutateFn: UseMutateFunction<any, Error, DataPost, unknown>;
defaultInputData?: DataPost;
}


const ArrStringToTextLine = (arrString: string[]) => {
let formattedString: string = "";
for (let i = 0; i < arrString.length; i++) {
    formattedString += arrString[i];
    if (i < arrString.length - 1) {
    formattedString += "\n";
    }
}
return formattedString;
}

const TextLineToArrString = (TextLine: string) => {
const arrStrings: string[] = [];
let temp: string = "";
for (let i = 0; i < TextLine.length; i++) {
    if (TextLine[i] === "\n" || i == TextLine.length - 1) {
    if(i == TextLine.length - 1) temp += TextLine[i];
    arrStrings.push(temp);
    temp = "";
    } else {
    temp += TextLine[i];
    }
}
return arrStrings;
}

const reformatPostFormFields = (postFieldsData: FormPostFields) => {
console.log(postFieldsData.tags);
const reformatedPostDat: DataPost = {
    title: postFieldsData.title,
    body: postFieldsData.body,
    tags: TextLineToArrString(postFieldsData.tags),
    reactions: postFieldsData.reactions,
    views: postFieldsData.views,
    userId: postFieldsData.userId

}

return reformatedPostDat;
}

const FormPost: React.FC<PostFormElementProps> = (props) => {
const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormPostFields>();

useEffect(() => {
    if (props.defaultInputData) {
    setValue("title", props.defaultInputData.title);
    setValue("body", props.defaultInputData.body);
    setValue("tags", ArrStringToTextLine(props.defaultInputData.tags));
    setValue("userId", props.defaultInputData.userId);
    }
}, [props.defaultInputData]);


const submitHandler = (data: FormPostFields) => {
    if (props.isEdit) {
    if (!confirm("Are you sure want to update post data ? ")) return;
    
    if(typeof props.defaultInputData?.reactions !== "undefined"){
        data.reactions = {
        likes : props.defaultInputData.reactions.likes,
        dislikes : props.defaultInputData.reactions.dislikes
        }
    }

    if(typeof props.defaultInputData?.views !== "undefined"){
        data.views = props.defaultInputData.views;
    }

    } else {
    data.reactions = {
        likes : 0,
        dislikes: 0
    }
    data.views = 1;
    }


    const reformatedPostDat = reformatPostFormFields(data);
    console.log(reformatedPostDat);
    props.mutateFn(reformatedPostDat);
}


return (
    <>
    <form className="flex flex-col space-y-5 mx-auto max-w-[500px] bg-gray-800 p-6 rounded-2xl" onSubmit={handleSubmit(submitHandler)}>

        <div className="flex flex-col gap-2">
        <label className="text-lg font-bold text-white" htmlFor="userId">User ID</label>
        <input className="rounded-lg" type="number" id="userId" {...register('userId', { required: "User ID is required." })} />
        {
            errors.userId && (
            <p className="text-red-500 italic">{errors.userId.message}</p>
            )
        }
        </div>

        <div className="flex flex-col gap-2">
        <label className="text-lg font-bold text-white" htmlFor="title">Judul Post</label>
        <input className="rounded-lg w-full" type="text" id="title" {...register('title', { required: "Post title is required." })} />
        {
            errors.title && (
            <p className="text-red-500 italic">{errors.title.message}</p>
            )
        }
        </div>

        <div className="flex flex-col gap-2">
        <label className="text-lg font-bold text-white" htmlFor="body">Isi Post</label>
        <Textarea className="rounded-lg h-[10rem]" id="body" {...register('body', { required: "Post body is required." })} ></Textarea>
        {
            errors.body && (
            <p className="text-red-500 italic">{errors.body.message}</p>
            )
        }
        </div>



        <div className="flex flex-col gap-2">
        <label className="text-lg font-bold text-white" htmlFor="tags">Label Post</label>
        <Textarea className="rounded-lg h-[10rem]" id="tags" {...register('tags', { required: "Post tags is required." })} ></Textarea>
        {
            errors.tags && (
            <p className="text-red-500 italic">{errors.tags.message}</p>
            )
        }
        </div>




        <div className="flex items-center justify-center">
        {props.isEdit ? (
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Save Post
            </button>
        ) : (
            <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Add Post
            </button>
        )}
        </div>
    </form>
    </>
)
}

export default FormPost