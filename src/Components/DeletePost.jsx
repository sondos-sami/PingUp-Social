import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function DeletePost({ id }) {
const queryClient=useQueryClient()
    async function deletePost() {
        try {
            const response = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                }
            });
                 queryClient.invalidateQueries({ queryKey: ['userPosts'] });
                   queryClient.invalidateQueries({ queryKey: ['posts'] }); 
            
        } catch (error) {
            console.log(error);
          
        }
    }

    useEffect(() => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this post?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deletePost()
                },
                {
                    label: 'No',
                    onClick: () => onClose && onClose()
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }, [id]);

    return null; // This component doesn't render anything visible
}

export default DeletePost;