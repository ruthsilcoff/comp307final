from django.test import TestCase
from app.models import Subject


# test the labels for the fields, since we rely on them
# can check length of field entries to know it is correct


class SubjectModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # set up object used by all test methods
        Subject.objects.create(name='debate class')

    def test_name_label(self):
        # get subject object to test
        subject = Subject.objects.get(name='debate class')
        # get metadata for required field and use to query data
        # metadata is needed to access object attributes
        field_label = subject._meta.get_field('name').verbose_name
        # compare value to expected result
        self.assertEquals(field_label, 'name')

    def test_description_label(self):
        subject = Subject.objects.get(name='debate class')
        field_label = subject._meta.get_field('description').verbose_name
        self.assertEquals(field_label, 'description')

    def test_name_max_length(self):
        subject = Subject.objects.get(name='debate class')
        max_length = subject._meta.get_field('name').max_length
        self.assertEquals(max_length, 100)

    def test_description_max_length(self):
        subject = Subject.objects.get(name='debate class')
        max_length = subject._meta.get_field('description').max_length
        self.assertEquals(max_length, 100)

    def test_description_null(self):
        subject = Subject.objects.get(name='debate class')
        self.assertFalse(subject.description)
