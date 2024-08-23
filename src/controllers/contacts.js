import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortOrder.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    data: contacts,
    message: 'Successfully found contacts!',
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

// export const createContactController = async (req, res) => {
//   const contactData = {
//     ...req.body,
//     userId: req.user._id,
//     photo: req.file,
//   };
//   console.log(contactData);

//   const contact = await createContact(contactData);
//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data: contact,
//   });
// };

export const createContactController = async (req, res) => {
  let photoUrl;

  if (req.file) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file);
    } else {
      photoUrl = await saveFileToUploadDir(req.file);
    }
  }

  const contactData = {
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  };

  const contact = await createContact(contactData);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

// export const patchContactController = async (req, res, next) => {
//   const { contactId } = req.params;

//   const photo = req.file;
//   let photoUrl;

//   if (env('ENABLE_CLOUDINARY') === 'true') {
//     photoUrl = await saveFileToCloudinary(photo);
//   } else {
//     if (photo) {
//       photoUrl = await saveFileToUploadDir(photo);
//     }
//   }
//   // console.log('Photo URL:', photoUrl);
//   const result = await updateContact(
//     contactId,
//     {
//       ...req.body,
//       photo: photoUrl,
//     },
//     req.user._id,
//   );

//   if (!result) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }
//   res.status(200).json({
//     status: 200,
//     message: 'Successfully patched a contact!',
//     data: result.contact,
//   });
// };

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  let photoUrl;

  if (req.file) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(req.file);
    } else {
      photoUrl = await saveFileToUploadDir(req.file);
    }
  }

  const updateData = {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };

  const result = await updateContact(contactId, updateData, req.user._id);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
