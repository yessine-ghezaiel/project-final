import React from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const LoginComponent = () => {
    return (
        <form className="flex-column-center">
            <input type="email" placeholder="example@email.com"></input>
            <input type="password" placeholder="*********"></input>
            <button type="submit" style={{ alignSelf: 'flex-end', color: "black" }}>Submit</button>
            <button type="reset" style={{ alignSelf: 'flex-end', color: "black" }}>Reset</button>
        </form>
    )
}

export default LoginComponent