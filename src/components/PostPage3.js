import React from 'react'

const PostPage3 = ({files ,setFile}) => {

    const handleFileChange = (e) => {
        setFile(e.target.files);
    };
  return (
    <div >
    <h5>Select upto 5 Images</h5>
    <input
    className='input_file'
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
    />
</div>
  )
}

export default PostPage3
