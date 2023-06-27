import multer from 'multer'
import express, { Request, Response } from 'express'
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/images')
  },
  filename(req, file, cb) {
    cb(null, req.body.filename)
  },
})

const upload = multer({
  storage,
})

router.post(
  '/image',
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      return res.status(200).json('File uploaded successfully')
    } catch (error) {
      throw new Error('File was not uploaded')
    }
  },
)

export const UploadRouter = router
