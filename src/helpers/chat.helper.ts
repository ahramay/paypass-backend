import moment from 'moment';

interface Conversation {
  _doc: {
    sender?: {
      _id: string;
      name: string;
    };
    createdAt: Date;
  };
}

export const formatMessage = (conversation: Conversation, currentLoggedUser: string) => {
  return {
    ...conversation._doc,
    myMessage: String(conversation._doc.sender?._id) === String(currentLoggedUser),
    username: conversation?._doc?.sender?.name,
    time: moment(conversation?._doc?.createdAt).fromNow(),
    companyName: 'Test company',
    seen: true,
  };
};

export const getFileTypeByName = (fileName: string | undefined): string => {
  return fileName?.split?.('.')?.pop?.() || 'Unknown';
};

interface VerifyAnswersParams {
  answer: any;
  type: 'multiple' | 'checkbox' | 'shortAnswer';
}

export const verifyAnswersByTypes = ({ answer, type }: VerifyAnswersParams): boolean => {
  if (type === 'multiple') {
    // must be a number
    return !isNaN(answer);
  }
  if (type === 'checkbox') {
    // must be an array
    let result = false;
    if (Array.isArray(answer)) {
      result = true;
      // check if every answer in array is a number
      if (!answer.every((ans: any) => !isNaN(ans))) {
        result = false;
      }
    }
    return true;
  }
  if (type === 'shortAnswer') {
    return typeof answer === 'string';
  }
  return false;
};

export const getPercentage = (total: number, count: number): number => {
  console.log('will be ', (count * 100) / total || 0);
  return Math.round((count * 100) / total || 0);
};
