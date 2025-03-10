import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';

interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
}

interface Comments {
    comments: Comment[];
}

interface DeletedComment extends Comment {
    isDeleted: Boolean;
    deletedOn: string;
}

const fetchCommentsDat = async () => {
    return axios.get<Comments>('/comments');
};

const deleteComments = async (id: string | undefined) => {
    return await axios.delete<DeletedComment>(`comments/${id}`);
};

const CommentsSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4 bg-gray-100 p-5 rounded-lg shadow-md animate-pulse">
            <div className="flex items-center space-x-4">
                <div className="bg-gray-300 h-12 w-12 rounded-full"></div>
                <div className="flex-1">
                    <div className="bg-gray-300 h-4 w-32 rounded-md mb-2"></div>
                    <div className="bg-gray-300 h-3 w-24 rounded-md"></div>
                </div>
            </div>
            <div className="bg-gray-300 h-4 w-full rounded-md"></div>
            <div className="bg-gray-300 h-4 w-3/4 rounded-md"></div>
        </div>
    );
};

const Comments = () => {
    const getCommentDat = useQuery({
        queryKey: ['comments'],
        queryFn: fetchCommentsDat,
    });

    const deleteCommentDat = useMutation({ mutationFn: (id: string) => deleteComments(id) });

    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-6">
            <button
                className="fixed bottom-4 right-4 bg-indigo-500 text-white rounded-full p-4 shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 z-10"
                onClick={() => navigate('./add')}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    ></path>
                </svg>
            </button>
            <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Comments</h2>
                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {getCommentDat.isFetching
                        ? Array.from({ length: 3 }).map((_, index) => <CommentsSkeleton key={index} />)
                        : getCommentDat.data?.data.comments.map((comment) => {
                              return (
                                  <div
                                      key={comment.id}
                                      className="flex flex-col space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                  >
                                      <div className="flex items-center space-x-4">
                                          <div className="bg-indigo-200 text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center font-bold">
                                              {comment.user.fullName.charAt(0)}
                                          </div>
                                          <div className="flex-1">
                                              <div className="flex justify-between items-center">
                                                  <p className="font-semibold text-gray-800">
                                                      {comment.user.fullName}
                                                  </p>
                                                  <div className="relative group">
                                                      <button>
                                                          <svg
                                                              className="w-6 h-6 text-gray-600 hover:text-gray-800"
                                                              fill="none"
                                                              strokeWidth="1.5"
                                                              stroke="currentColor"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                          >
                                                              <path
                                                                  d="M12 5v14m7-7H5"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                              ></path>
                                                          </svg>
                                                      </button>
                                                      <div className="absolute bottom-0 right-5 mt-2 bg-white rounded-lg shadow-lg w-36 hidden group-hover:block ">
                                                          <button
                                                              onClick={() => navigate(`${comment.id}/edit`)}
                                                              className=" w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                                          >
                                                              Edit
                                                          </button>
                                                          <button
                                                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                              onClick={() => {
                                                                  if (
                                                                      confirm(
                                                                          'Are you sure you want to delete this comment?'
                                                                      )
                                                                  ) {
                                                                      deleteCommentDat.mutate(
                                                                          comment.id.toString()
                                                                      );
                                                                  }
                                                              }}
                                                          >
                                                              Delete
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                              <p className="text-sm text-gray-600 italic">
                                                  @{comment.user.username} - ID: {comment.user.id}
                                              </p>
                                          </div>
                                      </div>
                                      <p className="text-gray-800">{comment.body}</p>
                                      <div className="text-right text-sm text-gray-500">Comment ID: {comment.id}</div>
                                  </div>
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default Comments;
