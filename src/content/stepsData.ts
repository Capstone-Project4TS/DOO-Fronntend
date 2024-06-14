export const steps = [
    {
        id: 1,
        title: "Personal information",
        section: [
            {
                sectionId: 1,
                title: "Loan Information",
                content: [
                    { title: "Borrower Name", type: "text", required: { required: true, } },
                    {
                        title: "Loan Type",
                        type: "select",
                        options: ["Personal", "Business"],
                        required: { required: true, }
                    },
                ],
                multiple: false,
            },
            {
                sectionId: 2,
                title: " Bank Information",
                content: [
                    { title: "Bank account number", type: "text", required: { required: true, } },
                    {
                        title: "Bank account type",
                        type: "select",
                        options: ["saving"],
                        required: { required: true, },
                    },
                    { title: "Add another account", type: "text", required: { required: false, } },
                ],
                multiple: false,
            },
        ],
    },
    {
        id: 2,
        title: "Collateral information",
        section: [
            {
                sectionId: 1,
                title: "Collateral Information",
                content: [
                    { title: "Collateral Type", type: "text", required: { required: true, } },
                    {
                        title: "Collateral Description",
                        type: "text-editor",
                        required: { required: true, },
                    },
                    { title: "Documents", type: "upload", required: { required: true, } },
                ],
                multiple: true,
            },
        ],
    },
];