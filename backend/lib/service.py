from lib.dev_db import DevDB
from lib.models import Figure

class FiguresManager():

    def __init__(self):
        self.db = DevDB()

    def create_figures(
            self, figures_data
        ) -> None:
        """Load the figures' data into an instance of model.Figure, and then calls the DB to create a figure.
        Args:
            figures_data: The data of the figures.

        Returns:
            None
        """

        try:
            figures = [
                Figure (
                    org_id=figure_data['org_id'],
                    figure=figure_data['figure']
                ) 
                for figure_data in figures_data
            ]
        except Exception as err:
            raise Exception(f'Could not convert figure to Figure model: {err}')
        
        self.db.create_figures(figures=figures)

    def get_org_ids(self) -> list:
        """Calls the DB to get the organizations IDs.
        Returns:
            A list of the organisation IDs.
        """
        try:
            org_ids = self.db.get_org_ids()
            return org_ids
        except Exception as err:
            raise Exception(err)
        
    def get_figures(self) -> list:
        """Get all figures.
        Returns:
            All figures in the DB.
        """
        try:
            figures = self.db.get_figures()
            return figures
        except Exception as err:
            raise Exception(err)