import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import DeletePost from "./DeletePost";
import CreatePosts from "../Pages/Posts/CreatePosts";
import { useState } from "react";

function DropDwon({ post }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
 
  return (
    <div>
    
      {isDelete && <DeletePost id={post?._id} />}

      {isUpdate && (
        <>
      

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <CreatePosts
                  onClose={onClose}
                  mode="edit"
                  postId={post?._id}
                  initialBody={post?.body}
                  initialImage={post?.image}
                />
              )}
            </ModalContent>
          </Modal>
        </>
      )}

      <Dropdown>
        <DropdownTrigger>
          <button>
            <i className="fa-solid fa-list"></i>
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new" onPress={onOpen}  onClick={() => setIsUpdate(true)}>
            Edit Post
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => setIsDelete(true)}
          >
            Delete Post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default DropDwon;
