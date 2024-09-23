import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, ChangeEvent } from 'react';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const AddSkill = (props) => {

    const {handleSkills} = props;

    let [isOpen, setIsOpen] = useState(false);
    let [skills, setSkills] = useState<string[]>([]); // Explicitly specifying string[] for skills
    let [education, setEducation] = useState("");

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleSkillsChange = (newTags: string[]) => { // Explicitly specifying string[] for newTags
        setSkills(newTags);
    };

    const handleEducationChange = (event: ChangeEvent<HTMLInputElement>) => { // Specifying the event type
        setEducation(event.target.value);
    };

    const onAddSkillClicked = async(event: any) => {
        event.preventDefault();
        const newSkill = skills.join(", ");
        console.log(newSkill, education)
        handleSkills(newSkill, education);
        closeModal();
        window.location.href = '#testimonial'; // Redirect to testimonial section
    }
    

    return (
        <>
               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
                <div className='hidden lg:block'>
                    <button className="text-Blueviolet text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out rounded-full bg-semiblueviolet hover:text-white hover:bg-Blueviolet" onClick={openModal}>
                        Add Skills
                    </button>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-md space-y-8">
                                            <div>
                                                <img
                                                    className="mx-auto h-12 w-auto"
                                                    src="/assets/logo/logo.svg"
                                                    alt="Your Company"
                                                />
                                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                    Add Your Skills 
                                                </h2>
                                            </div>
                                            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(event) => {
                                                onAddSkillClicked(event)}}>
                                                <input type="hidden" name="remember" defaultValue="true" />
                                                <div className="-space-y-px rounded-md shadow-sm">
                                                    <div>
                                                        <label htmlFor="education" className="sr-only">
                                                            Education
                                                        </label>
                                                        <input
                                                            id="education"
                                                            name="education"
                                                            type="text"
                                                            required
                                                            value={education}
                                                            onChange={handleEducationChange}
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Enter Education"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="skills" className="sr-only">
                                                            Skills
                                                        </label>
                                                        <ReactTagInput
                                                            tags={skills}
                                                            onChange={handleSkillsChange}
                                                            placeholder="Enter Skills"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        Add Skills
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Exit
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default AddSkill;
