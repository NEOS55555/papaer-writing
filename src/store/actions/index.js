import axios from 'axios';
// import url from '@/common/api'
// import cookie from 'react-cookies';
import { message } from 'antd';

const UPDATE_CHAPTER_LIST = 'UPDATE_CHAPTER_LIST'

const UPDATE_EDITOR_DATA = 'UPDATE_EDITOR_DATA'
const UPDATE_CHAPTER_EDITOR = 'UPDATE_CHAPTER_EDITOR'


export const updateChapterList = data => ({type: UPDATE_CHAPTER_LIST, data})
export const updateEditorData = data => ({type: UPDATE_EDITOR_DATA, data})
export const updateEditorEdit = data => ({type: UPDATE_CHAPTER_EDITOR, data})


export {
  UPDATE_CHAPTER_LIST,
  UPDATE_EDITOR_DATA,
  UPDATE_CHAPTER_EDITOR,
}
