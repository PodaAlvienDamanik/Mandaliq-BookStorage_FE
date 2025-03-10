import { UseMutateFunction } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Comment {
    body : string,
    postId : number,
    user : {
    id : number
    }
}

interface FormCommentFields{
    body : string,
    postId : number,
    userId : number
}

interface FormCommentProps{
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, Comment, unknown>;
    defaultInputData?: Comment;
}



const FormComment : React.FC<FormCommentProps> = (props) => {
    const {register, handleSubmit, setValue ,formState : {errors}} = useForm<FormCommentFields>()

    useEffect(() => {
    if (props.defaultInputData) {
        setValue("userId", props.defaultInputData.user.id);
        setValue("postId", props.defaultInputData.postId);
        setValue("body", props.defaultInputData.body);
    }
    }, [props.defaultInputData]);

    const submitHandler = (data : FormCommentFields) => {
        if (props.isEdit) {
            if (!confirm("Are you sure want to update comment data ? ")) return;
            
        }
        
        const newComment : Comment = {
            body : data.body,
            postId : data.postId,
            user : {
                id : data.userId
            }
        }
    props.mutateFn(newComment);
    }

return (
    <form className="flex flex-col space-y-5 mb-44 mt-10 mx-auto max-w-[500px] bg-gray-800 p-6 rounded-2xl" onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col">
            <label className="text-lg font-bold text-white" htmlFor="userId">User ID</label>
            <input type="number" id="userId" {...register("userId",{required: "UserId is required."})} />
            {
            errors.userId && (
            <p className="text-red-500 italic">{errors.userId.message}</p>
            )
        }
        </div>
        <div className="flex flex-col">
            <label className="text-lg font-bold text-white" htmlFor="fullName">Post ID</label>
            <input type="number" id="fullName" {...register("postId",{required: "Post ID is required."})} />
            {
            errors.postId && (
            <p className="text-red-500 italic">{errors.postId.message}</p>
            )
        }
        </div>
        <div className="flex flex-col">
            <label className="text-lg font-bold text-white" htmlFor="body">Comment Body</label>
            <textarea id="body" {...register("body",{required: "Comments body is required."})} />
            {
            errors.body && (
            <p className="text-red-500 italic">{errors.body.message}</p>
            )
        }
        </div>
        <div className="flex items-center justify-center">
        {props.isEdit ? (
            <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Save Comment
            </button>
        ) : (
            <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            >
            Add Comment
            </button>
        )}
        </div>
    </form>
)
}

export default FormComment