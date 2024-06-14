import pdf from '../../public/asset/icons/pdf.svg';
import copy from '../../public/asset/icons/copy.svg';
import edit from '../../public/asset/icons/edit.svg';
import trash from '../../public/asset/icons/delete.svg';
import { Link } from '@tanstack/react-router';

interface AssignedToMeCardProps {
  link: string;
  name: string;
  dateCreated: string;
  type: string;
  status: string;
  w_id: string;
}

const AssignedByMeCard: React.FC<AssignedToMeCardProps> = (props) => {
  return (
    <div className='flex border-b border-gray-500 border-opacity-20 gap-10'>
      <div className='py-3 px-4 h-11 w-24'>
        <input
          type="checkbox"
          className="w-4 h-4 text-teal-600 bg-teal-100 border-teal-300 rounded focus:ring-teal-500"
        />
      </div>
      <Link to={`/assignedbymedetails/${props.w_id}`} className='py-3 flex items-center gap-4 text-xs text-gray-600 w-96'>


        <img src={pdf} alt="" />
        <p>{props.name}</p>
      </Link>
      <div className='py-3 px-6 flex items-center gap-1 text-xs text-gray-600 w-96'>
        {props.dateCreated}
      </div>
      <div className='py-3 px-6 flex items-center gap-1 text-xs text-gray-600 w-96'>
        {props.type}
      </div>
      <div className='py-3 px-6 flex items-center gap-1 text-xs text-teal-400 w-96'>
        {props.status}
      </div>
      <div className='py-3 px-6 flex items-center text-xs text-gray-600 w-96 gap-2'>
        <button>
          <img src={copy} alt="" />
        </button>
        <button>
          <img src={edit} alt="" />
        </button>
        <button>
          <img src={trash} alt="" />
        </button>
      </div>
    </div>
  );
}

export default AssignedByMeCard;
