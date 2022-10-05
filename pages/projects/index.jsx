import Projects from '../../src/components/projects'
import { default as NextLink} from "next/link";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add'
import Layout from "../../src/components/Layout";

export default function ProjectsPage() {
    return (
        <>
            <NextLink href='/projects/create' passHref>
                <Button variant="outlined" startIcon={<AddIcon />}>
                    New Project
                </Button>
            </NextLink>
            <Projects />
        </>
    )
}


ProjectsPage.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}