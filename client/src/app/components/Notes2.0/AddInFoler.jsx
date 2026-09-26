import { FolderContext } from '@/app/context/folder'
import React, { useContext } from 'react'

export const AddInFoler = () => {
    const {folders} = useContext(FolderContext)
  return (
    <div>
              {folderModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", widows: "800px" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          </div>
        </div>
      )}
    </div>
  )
}
